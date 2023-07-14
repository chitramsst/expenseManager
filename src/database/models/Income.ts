//@ts-nocheck
import { Model } from '@nozbe/watermelondb'
import { field, text,date } from '@nozbe/watermelondb/decorators'

export default class Income extends Model {
  static table = 'incomes'
  @field('amount') amount 
  @date('date') date
  @field('title') title
  @field('attachment_url') attachment_url
  @field('description') description
}