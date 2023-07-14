import { appSchema, tableSchema } from '@nozbe/watermelondb'

 const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'incomes',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'date', type: 'number' },
                { name: 'attachment_url', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'description', type: 'string' },
            ]
        }),
        tableSchema({
            name: 'categories',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'icon_number', type: 'number' },
                { name: 'default', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'expenses',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'date', type: 'number' },
                { name: 'category_id', type: 'string' },
                { name: 'attachment_url', type: 'string' },
                { name: 'income_type', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'description', type: 'string' },
            ]
        }),
    ],
})

export default mySchema