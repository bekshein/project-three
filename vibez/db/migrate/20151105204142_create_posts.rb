class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :song_title
      t.string :artist_name
      t.string :vibe
      t.integer :like

      t.references :user, index:true, foreign_key: true

      t.timestamps null: false
    end

    add_index :posts, :vibe
  end
end
