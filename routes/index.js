const { createCategory,  getAllCategories } = require("../controllers/categoriaControllers")
const { getAllCuorses, createCourse, deleteCourse, updateCourse } = require("../controllers/cursoControllers")
const { getAllUsers, register, changeToAdmin, getUserByID, deleteUser, login, updateUser } = require("../controllers/userControllers")
const authenticateAdmin = require("../middlewares/authAdmin")
const authenticateUser = require("../middlewares/authUser")
const upload = require ("../middlewares/multer")

// este router me da acceso a todos los metodos de solicitud http. Router() es un metodo
const router = require ("express").Router()

// user routes
router.get("/user", authenticateAdmin, getAllUsers)
router.get("/user/:id", authenticateAdmin, getUserByID)
router.delete("/user/:id",  authenticateAdmin, deleteUser)
router.put("/user/:id", authenticateUser, updateUser)
router.put("/admin/:id", authenticateAdmin, changeToAdmin)
router.post("/user/registrar", register)
router.post("/user/login", login)

//Categoria Route
router.get("/categorias", getAllCategories)
router.post("/categoria",  authenticateAdmin, createCategory)

//Cursos Route
router.get("/cursos", getAllCuorses)
router.post("/curso",  authenticateAdmin, upload.single("imagen"), createCourse)
router.delete("/curso/:id", authenticateAdmin, deleteCourse)
router.put("/curso/:id",  authenticateAdmin, updateCourse)


// exportamos el router
module.exports = router