import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Генерация токена
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Отправка кода подтверждения
const sendCode = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await userModel.findOne({ phone });
    if (user && user.password) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    await userModel.findOneAndUpdate(
      { phone },
      { code, codeExpires: Date.now() + 300000 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Код подтверждения для ${phone}: ${code}`);
    res.json({ success: true, message: "Code sent successfully", code });
  } catch (error) {
    console.error("Error sending code:", error);
    res.status(500).json({ success: false, message: "Error sending code" });
  }
};

// Логин пользователя
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);

    // Устанавливаем cookie с токеном
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Только по HTTPS в production
      sameSite: "strict",
      maxAge: 3600000, // 1 час
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Регистрация пользователя
const registerUser = async (req, res) => {
  const { name, phone, password, code } = req.body;

  try {
    console.log("Received data:", { name, phone, password, code });

    // Поиск временной записи с кодом
    const tempUser = await userModel.findOne({ phone, code: { $exists: true } });
    if (!tempUser) {
      console.log("Invalid code: No temporary user found");
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    // Проверка срока действия кода
    if (tempUser.codeExpires < Date.now()) {
      console.log("Code expired");
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    // Проверка кода подтверждения
    if (tempUser.code !== code) {
      console.log("Invalid code: Code mismatch");
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    // Проверка, существует ли пользователь с таким номером телефона
    const exists = await userModel.findOne({ phone, password: { $exists: true } });
    if (exists) {
      console.log("User already exists");
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Валидация номера телефона
    if (!validator.isMobilePhone(phone.toString(), "any")) {
      console.log("Invalid phone number");
      return res.status(400).json({ success: false, message: "Invalid phone number" });
    }

    // Валидация пароля
    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      console.log("Weak password");
      return res.status(400).json({ success: false, message: "Password is not strong enough" });
    }

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Удаление временной записи с кодом
    await userModel.findOneAndDelete({ phone, code: { $exists: true } });

    // Создание нового пользователя
    const newUser = new userModel({
      name,
      phone,
      password: hashedPassword,
    });

    // Сохранение пользователя в базе данных
    const savedUser = await newUser.save();

    // Генерация токена
    const token = createToken(savedUser._id);

    // Установка cookie с токеном
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Только по HTTPS в production
      sameSite: "strict",
      maxAge: 3600000, // 1 час
    });

    res.json({ success: true, message: "Registration successful", token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Проверка авторизации
const checkAuth = async (req, res) => {
  const token = req.cookies.token; // Получаем токен из cookies
  if (!token) {
    return res.status(401).json({ success: false, message: "Не авторизован" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден" });
    }

    res.json({ success: true, token, user }); // Возвращаем данные пользователя
  } catch (error) {
    res.status(401).json({ success: false, message: "Неверный токен" });
  }
};

// Выход пользователя
// Выход пользователя
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден" });
    }

    // Очищаем корзину пользователя
    await userModel.findByIdAndUpdate(decoded.id, { cartData: {} });

    // Удаляем токен из куки
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ success: false, message: "Error during logout" });
  }
};

export { loginUser, registerUser, sendCode, checkAuth, logoutUser };