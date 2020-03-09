
<template>
  <div class="table">
    <h1><font face="cursive">Wedding Schedule</font></h1>

    <img src="../assets/wedding.png" alt="Wedding" width=100%>
    {{current}}
    {{todos_now}}

    <div align='left'>
        <p></p>
        <label v-for="label in options" :key="label.value">
        <input type="radio"
            v-model="current"
            v-bind:value="label.value">{{ label.label }}
        </label>
    </div>
    <div align='left'>
        {{ computedTodos.length }} 件を表示中
        <p></p>
    </div>
          <!-- テーブルヘッダー -->
      <!-- <thead>
        <tr>
          <th class="id" width="10%">ID</th>
          <th class="comment">コメント</th>
          <th class="startDay">作業予定日</th>
          <th class="finishDay">作業完了日</th>
          <th class="role" width="15%">担当</th>
          <th class="state" width="15%">状態</th>
          <th width="10%">-</th>
        </tr>
      </thead> -->
    <!-- Optionが-1（全て）の場合 -->
    <div v-if="current === -1">
    <table>
      <thead>
        <tr>
          <th width="5%">ID</th>
          <th width="41%">コメント</th>
          <th width="12%">作業予定日</th>
          <th width="12%">作業完了日</th>
          <th width="7%">担当</th>
          <th width="13%">状態</th>
          <th width="10%">-</th>
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
            <button-table v-on:click="doChangeState(item)">{{ labels[item.state] }}</button-table>
          </td>
          <td>
            <!-- 削除ボタンのモック -->
            <button-table v-on:click="doRemove(item)">削除</button-table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- Optionが0（作業中）の場合 -->
    <div v-else-if="current === 0">
    <table>
      <thead>
        <tr>
          <th width="5%">ID</th>
          <th width="41%">コメント</th>
          <th width="12%">作業予定日</th>
          <th width="12%">作業完了日</th>
          <th width="7%">担当</th>
          <th width="13%">状態</th>
          <th width="10%">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos_now" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td>{{ item.startDay }}</td>
          <td>{{ item.finishDay }}</td>
          <td>{{ item.role }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
            <button-table v-on:click="doChangeState(item)">{{ labels[item.state] }}</button-table>
          </td>
          <td>
            <!-- 削除ボタンのモック -->
            <button-table v-on:click="doRemove(item)">削除</button-table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- Optionが1（完了）の場合 -->
    <div v-else-if="current === 1">
    <table>
      <thead>
        <tr>
          <th width="5%">ID</th>
          <th width="41%">コメント</th>
          <th width="12%">作業予定日</th>
          <th width="12%">作業完了日</th>
          <th width="7%">担当</th>
          <th width="13%">状態</th>
          <th width="10%">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos_finish" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td>{{ item.startDay }}</td>
          <td>{{ item.finishDay }}</td>
          <td>{{ item.role }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
            <button-table v-on:click="doChangeState(item)">{{ labels[item.state] }}</button-table>
          </td>
          <td>
            <!-- 削除ボタンのモック -->
            <button-table v-on:click="doRemove(item)">削除</button-table>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- 作業追加の入力フォーム -->
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
    <!-- コメント入力フォーム -->
    コメント <input type="text" ref="comment">
    <!-- 追加ボタンのモック -->
    <button-table type="submit">追加</button-table>
    </form>

    <div>
      <modal></modal>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('modal', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
export default {
  name: 'Table',
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
        {'id': 2, 'comment': '新しいToDo2', 'state': 0, 'startDay': '2020/3/4', 'finishDay': '2020/3/9', 'role': '両方'},
        {'id': 3, 'comment': 'ToDo3', 'state': 1, 'startDay': '2020/3/2', 'finishDay': '2020/3/15', 'role': '両方'}
      ],
      todos_finish: [],
      todos_finish_tmp: [],
      todos_now: [],
      todos_now_tmp: [],
      now_exist_flag: false,
      finish_flag: false
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
      this.watch_now()
      this.watch_finish()
    },
    // 削除の処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
      this.watch_now()
      this.watch_finish()
    },
    listFinishTodos: function (item) {
      console.log(item)
      for (let num in item) {
        if (item[num]['state'] === 1) {
          if (this.todos_finish.length === 0) {
            this.todos_finish.push(item[num])
          } else {
            for (let number in this.todos_finish) {
              if (this.todos_finish[number].id === item[num].id) {
                this.finish_flag = true
              } else {
                console.log('Finish Already exsist')
              }
            }
            if (this.finish_flag === false) {
              this.todos_finish.push(item[num])
            }
            this.finish_flag = false
          }
        } if (item[num]['state'] === 0) {
          if (this.todos_now.length === 0) {
            this.todos_now.push(item[num])
          } else {
            for (let number in this.todos_now) {
              if (this.todos_now[number].id === item[num].id) {
                this.now_exist_flag = true
              } else {
                console.log('Now Already exsist')
              }
            }
            if (this.now_exist_flag === false) {
              this.todos_now.push(item[num])
            }
            this.now_exist_flag = false
          }
        }
      }
      return this.todos_finish
    },
    watch_now: function () {
      for (let now of this.todos_now) {
        if (now.state !== 0) {
          console.log('now.state!==0')
        } else {
          this.todos_now_tmp.push(now)
        }
      }
      this.todos_now = this.todos_now_tmp
      this.todos_now_tmp = []
      this.todos_now_sort()
    },
    watch_finish: function () {
      for (let finish of this.todos_finish) {
        if (finish.state !== 1) {
          console.log('finish.state!==1')
        } else {
          this.todos_finish_tmp.push(finish)
        }
      }
      this.todos_finish = this.todos_finish_tmp
      this.todos_finish_tmp = []
      this.todos_finish_sort()
    },
    todos_now_sort: function () {
      this.todos_now.sort(function (a, b) {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })
    },
    todos_finish_sort: function () {
      console.log('finish_sort')
      this.todos_finish.sort(function (a, b) {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })
    }
  },
  computed: {
    labels () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    // キーから見つけやすいように、次のように加工したデータを作成
    // {0: '作業中', 1: '完了', -1: 'すべて'}
    },
    computedTodos: function () {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    }
  },
  created: function () {
    this.listFinishTodos(this.todos)
    console.log(this.todos_finish)
  },
  watch: {
    // この関数は question が変わるごとに実行されます。
    todos: {
      handler: function (todos) {
        this.listFinishTodos(todos)
      },
      deep: true
    },
    todos_now: {
      handler: function () {
        console.log('todos_now_watch')
        this.watch_now()
      },
      deep: true
    },
    todos_finish: {
      handler: function () {
        console.log('todos_finish_watch')
        this.watch_finish()
      },
      deep: true
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
button-table {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
