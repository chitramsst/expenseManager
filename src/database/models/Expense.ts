//@ts-nocheck
import { Model } from '@nozbe/watermelondb'
import { field, text,date, immutableRelation, children } from '@nozbe/watermelondb/decorators'

export default class Expense extends Model {
  static table = 'expenses'
  static associations = {
    category: { type: 'belongs_to', foreignKey: 'category_id' },
  }
  @field('amount') amount 
  @date('date') date
  @field('title') title
  @field('category_id') category_id
  @field('income_type') income_type
  @field('attachment_url') attachment_url
  @field('description') description
  @immutableRelation('categories', 'category_id') category
}