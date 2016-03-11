define("examples/ng-todo/1.0.0/main", ["angularjs", "./common", "./service", "store"],
function(a) {
    var b = a("angularjs"),
    c = a("./common"),
    d = a("./service"),
    e = b.module("TodoApp", []);
    return e.service("todoService", d),
    e.directive("ngBlur",
    function() {
        return function(a, b, c) {
            b.bind("blur",
            function() {
                a.$apply(c.ngBlur)
            })
        }
    }),
    e.controller("MainCtrl", ["$scope", "todoService",
    function(a, d) {
        a.todoService = d,
        a.title = "todo",
        a.todos = d.getTodos(),
        a.newTodo = "",
        a.activeFilter = {
            completed: ""
        },
        a.remaining = 0,
        a.hidden = !1,
        a.toggleAll = function() {
            this.hidden = !this.hidden
        },
        a.createOnEnter = function(a) {
            a.which === c.ENTER_KEY && this.newTodo.trim() && (this.todoService.addTodo(this.newTodo), this.newTodo = "")
        },
        a.$watch("todos",
        function() {
            var b = 0;
            a.todos.forEach(function(a) {
                a.completed || b++
            }),
            a.remaining = b,
            a.completed = a.todos.length - b,
            a.todoService.store()
        },
        !0),
        a.filter = function(a) {
            this.activeFilter.completed = a
        },
        a.selected = function(b) {
            return b === a.activeFilter.completed
        },
        a.getTodos = function() {
            return d.getTodos(this.activeFilter)
        },
        a.edit = function(a, c) {
            a.edit = !0,
            setTimeout(function() {
                b.element(c.target).parent().next()[0].focus()
            },
            0)
        },
        a.close = function(a) {
            a.edit = !1
        }
    }]),
    {
        init: function() {
            b.bootstrap(document.body, ["TodoApp"])
        }
    }
}),
define("examples/ng-todo/1.0.0/common", [], {
    TodoFilter: "",
    ENTER_KEY: 13
}),
define("examples/ng-todo/1.0.0/service", ["store"],
function(a, b, c) {
    var d = a("store");
    c.exports = function() {
        var a = [];
        return d.enabled && (console.log("localStorage is available"), a = d.get("todos") || d.set("todos", a)),
        {
            getTodos: function(b) {
                return b ? a.filter(function(a) {
                    return "" === b.completed ? !0 : a.completed === b.completed
                }) : a
            },
            addTodo: function(b) {
                a.push({
                    title: b,
                    completed: !1
                })
            },
            delTodo: function(b) {
                a.splice(b, 1)
            },
            clearCompleted: function() {
                for (var b = a.length - 1; b > -1; b--) a[b].completed && this.delTodo(b)
            },
            store: function() {
                d.set("todos", a)
            }
        }
    }
});