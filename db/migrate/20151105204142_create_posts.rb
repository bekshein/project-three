class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :source, null: false
      t.string :vibe, null: false
      t.integer :like

      t.references :user, index:true, foreign_key: true

      t.timestamps null: false
    end

    add_index :posts, :vibe
  end
end
