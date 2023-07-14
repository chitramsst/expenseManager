import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import migrations from './migrations/'
import schema from './schema/'
import Income from './models/Income'
import Category from './models/Category'
import Expense from './models/Expense'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  dbName : 'expenseManagerb',
  migrations,
  onSetUpError: error => {
    console.log(error)
  }
})

// Then, make a Watermelon database from it!¯
const database = new Database({
  adapter,
  modelClasses: [
    Income,
    Category,
    Expense
  ],
})


export default database