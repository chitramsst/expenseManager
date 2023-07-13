//@ts-nocheck
import database from '../index';
import { Q } from '@nozbe/watermelondb'
export interface Income{
    amount : number,
    title : string,
    description : string,
    date : Date
}

const incomes = database.collections.get('incomes');

export const observeIncome = () => incomes.query(
  Q.sortBy('date', Q.desc),
).observe();

export const saveIncome = async ({amount , title ,description, date}: Income) => {
    try{
        await database.write(async () => {
            await incomes.create((entry) => {
              entry.title = title;
              entry.amount = amount;
              entry.description = typeof(description) == 'string' ? description : '';
              entry.date = date;
              entry.attachment_url = '';
            });
          });
    }
  catch(e)
  {
    console.log(e)
  }
};

export const updateIncome = async ({id,amount , title ,description, date}) => {
  try{
      await database.write(async () => {
          let foundItem = await incomes.find(id)
          await foundItem.update((entry) => {
            entry.title = title;
            entry.amount = amount;
            entry.description = typeof(description) == 'string' ? description : '';
            entry.date = date;
            entry.attachment_url = '';
        });
    });
  }
  catch(e)
  {
    console.log(e)
  }
};

export const deleteIncome = async ({id}) => {
  try{
      await database.write(async () => {
          let foundItem = await incomes.find(id)
          await foundItem.markAsDeleted();
    });
  }
  catch(e)
  {
    console.log(e)
  }
};