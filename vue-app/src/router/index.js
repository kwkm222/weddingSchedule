import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableComponent from '@/components/TableComponent'
import Table from '@/components/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/e',
      name: 'TableComponent',
      component: TableComponent
    },
    {
      path: '/',
      name: 'Table',
      component: Table
    }
  ]
})
