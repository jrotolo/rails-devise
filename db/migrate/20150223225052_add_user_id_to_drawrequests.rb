class AddUserIdToDrawrequests < ActiveRecord::Migration
  def change
    add_column :drawrequests, :user_id, :integer
  end
end
