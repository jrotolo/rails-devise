class CreateDrawrequests < ActiveRecord::Migration
  def change
    create_table :drawrequests do |t|
      t.text :body

      t.timestamps
    end
  end
end
