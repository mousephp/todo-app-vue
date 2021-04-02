Vue.component('todo-item', {
    props: ['title', 'completed'],
    template: `
        <li v-bind:class="isactive ? 'completed' : ''">
            <p>{{this.index}} - </p>
            <span v-bind:class="completed" contenteditable="true" 
            v-on:keydown.enter="$emit('updatetaskkeydown')" v-on:blur="$emit('updatetaskblur')">
                {{this.title}}
            </span>
          <input v-bind:id="title" type="checkbox" v-bind:title="title" v-on:change="onToogle"  v-model="isactive">
            <button class="btn"
          v-on:click="$emit('delete')">X</button>				
      </li>			
      `,

    data: function () {
        return {
            isactive: false,
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    methods: {
        onToogle: function () {
            this.$emit('clicked', this.isactive);
        }
    }
});
var todoApp = new Vue({
    el: '#todolist',
    data: {
        message: 'Welcome to Todo App',
        inputName: '',
        lists: [],
        hasError: false,
        sortByStatus: false,
    },
    methods: {
        clickontoogle: function (active) {
            this.lists.completed = active;
        },

        addTask: function () {
            if (!this.inputName) {
                this.hasError = true;
                return;
            }
            this.hasError = false;
            this.lists.push({
                id: this.lists.length + 1,
                title: this.inputName,
                completed: false
            });
            this.inputName = '';
        },
        updateTask: function (e, list) {
            list.title = e.target.innerText;
            e.target.blur();
        },
        deleteTask: function (item) {
            this.lists.splice(item, 1);
        }
    },
    computed: {

    }
});

//Tạo data mẫu
todoApp.lists = [
    { id: 1, title: 'Go Home', completed: false },
    { id: 2, title: 'Pack Bag', completed: false },
    { id: 3, title: 'Catch the train', completed: true }
];