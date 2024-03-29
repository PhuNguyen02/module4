"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var todo_repository_1 = require("../repository/todo.repository");
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.getAllTasks = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, todo_repository_1.default.getAllTasks()];
                    case 1:
                        tasks = _a.sent();
                        res.json(tasks);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching tasks: ', error_1);
                        res.status(500).send('Error fetching tasks');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TodoController.prototype.getTaskById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, task, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskId = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, todo_repository_1.default.getTaskById(taskId)];
                    case 2:
                        task = _a.sent();
                        if (!task) {
                            res.status(404).send('Task not found');
                            return [2 /*return*/];
                        }
                        res.json(task);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error fetching task: ', error_2);
                        res.status(500).send('Error fetching task');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TodoController.prototype.addTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var title, existingTask, isExisting, taskId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = req.body.title;
                        if (!title) {
                            res.status(400).send('Title is required');
                            return [2 /*return*/];
                        }
                        if (title.length > 200) {
                            res.status(400).send('Title length should not exceed 200 characters');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, todo_repository_1.default.getAllTasks()];
                    case 2:
                        existingTask = _a.sent();
                        isExisting = existingTask.some(function (task) { return task.title === title; });
                        if (isExisting) {
                            res.status(400).send('Title already exists');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, todo_repository_1.default.addTask(title)];
                    case 3:
                        taskId = _a.sent();
                        res.status(201).json({ id: taskId });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Error creating task: ', error_3);
                        res.status(500).send('Error creating task');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TodoController.prototype.updateTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, title, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskId = parseInt(req.params.id);
                        title = req.body.title;
                        if (!title) {
                            res.status(400).send('Title is required');
                            return [2 /*return*/];
                        }
                        if (title.length > 200) {
                            res.status(400).send('Title length should not exceed 200 characters');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, todo_repository_1.default.updateTask(taskId, title)];
                    case 2:
                        _a.sent();
                        res.status(200).send('Task updated successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Error updating task: ', error_4);
                        res.status(500).send('Error updating task');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TodoController.prototype.deleteTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskId = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, todo_repository_1.default.deleteTask(taskId)];
                    case 2:
                        _a.sent();
                        res.status(200).send('Task deleted successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Error deleting task: ', error_5);
                        res.status(500).send('Error deleting task');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TodoController;
}());
exports.default = new TodoController();
