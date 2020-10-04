class CreateFruits < ActiveRecord::Migration[5.0]
  def change
    create_table :fruits do |t|
      t.string :name, null: false
      t.string :description
      t.timestamp :date, null: false

      t.timestamps
    end
    add_index :fruits, :name
    add_index :fruits, :date
  end
end
