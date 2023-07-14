import database from '../index';
import { Model, Q } from '@nozbe/watermelondb'
export interface Category extends Model{
    title : string,
    description : string,
    icon_number : number
    default : number
}

const categories = database.collections.get('categories');
export const getCategories = () => categories.query().fetch();

export const observeCategory = () => categories.query(
  // Q.sortBy('date', Q.desc),
).observe();

export const saveCategory = async ({ title ,description, icon_number}: Category) => {
    try{
        await database.write(async () => {
            await categories.create((entry : Category) => {
              entry.title = title;
              entry.description = typeof(description) == 'string' ? description : '';
              entry.icon_number = icon_number;
              entry.default = 0;
            });
          });
    }
  catch(e)
  {
    console.log(e)
  }
};

export const updateCategory = async ({ id,title ,description, icon_number}: Category) => {
  try{
      await database.write(async () => {
          let foundItem = await categories.find(id)
          await foundItem.update((entry) => {
            entry.title = title;
            entry.description = typeof(description) == 'string' ? description : '';
            entry.icon_number = icon_number;
        });
    });
  }
  catch(e)
  {
    console.log(e)
  }
};