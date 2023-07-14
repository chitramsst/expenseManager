//@ts-nocheck
import database from '../index';
import { Q } from '@nozbe/watermelondb'
export interface Expense{
    amount : number,
    title : string,
    description : string,
    income_type: number,
    attachment_url : string,
    category_id : string,
    date : Date
}

const expenses = database.collections.get('expenses');

export const observeExpense = () => expenses.query(
  Q.sortBy('date', Q.desc),
).observe();

export const saveExpense = async ({amount , title ,description, date, category_id}: Expense) => {
    try{
        await database.write(async () => {
            await expenses.create((entry) => {
              entry.title = title;
              entry.amount = amount;
              entry.description = typeof(description) == 'string' ? description : '';
              entry.date = date;
              entry.category_id = category_id;
              entry.attachment_url = '';
              entry.income_type = 1;
            });
          });
    }
  catch(e)
  {
    console.log(e)
  }
};

export const updateExpense = async ({id,amount , title ,description, date, category_id}) => {
  try{
      await database.write(async () => {
          let foundItem = await expenses.find(id)
          await foundItem.update((entry) => {
            entry.title = title;
            entry.amount = amount;
            entry.description = typeof(description) == 'string' ? description : '';
            entry.date = date;
            entry.category_id = category_id;
            entry.attachment_url = '';
            entry.income_type = 1;
        });
    });
  }
  catch(e)
  {
    console.log(e)
  }
};

export const deleteExpense = async ({id}) => {
  try{
      await database.write(async () => {
          let foundItem = await expenses.find(id)
          await foundItem.markAsDeleted();
    });
  }
  catch(e)
  {
    console.log(e)
  }
};