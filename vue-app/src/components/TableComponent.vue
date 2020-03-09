<template>
  <div class="table">
    <h1><font face="cursive">Wedding Schedule</font></h1>

    <img src="../assets/wedding.png" alt="Wedding" width=100%>
    <div align="left">
      <h2>To do List</h2>
    </div>

<template>
    <div>
            <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
  </div>
</template>

    <table>
      <!-- テーブルヘッダー -->
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="startDay">作業予定日</th>
          <th class="finishDay">作業完了日</th>
          <th class="role">担当</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td>{{ item.startDay }}</td>
          <td>{{ item.finishDay }}</td>
          <td>{{ item.role }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
            <button v-on:click="doChangeState(item)">{{ labels[item.state] }}</button>
          </td>
          <td class="button">
            <!-- 削除ボタンのモック -->
            <button v-on:click="doRemove(item)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 作業追加の入力フォーム -->
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
    <!-- コメント入力フォーム -->
    コメント <input type="text" ref="comment">
    <!-- 追加ボタンのモック -->
    <button type="submit">追加</button>
    </form>
  </div>
</template>

<script>
// todo Storageをローカルに作成本番用はAWSに
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {
  name: 'TableComponent',
  data () {
    return {
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' }
      ],
      current: -1,
      msg: 'START table Component',
      todos: [
        {'id': 1, 'comment': '新しいToDo1', 'state': 0, 'startDay': '2020/3/1', 'finishDay': '2020/3/3', 'role': '恭亮'},
        {'id': 2, 'comment': '新しいToDo2', 'state': 0, 'startDay': '2020/3/4', 'finishDay': '2020/3/9', 'role': '両方'}
      ]
    }
  },
  methods: {
    // ToDo 追加の処理
    doAdd: function (event, value) {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: this.todos.length + 1,
        comment: comment.value,
        state: 0
      })
      // フォーム要素を空にする
      comment.value = ''
    },
    // 状態変更の処理
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1
    },
    // 削除の処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  computed: {
    labels () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    // キーから見つけやすいように、次のように加工したデータを作成
    // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* Add table CSS */
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.button, tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;
}
tbody tr.done td,
tbody tr.done th {
  background: #f8f8f8;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
