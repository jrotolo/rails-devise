class Drawrequest < ActiveRecord::Base
  belongs_to :user, inverse_of: :drawrequests
  has_many :submissions
end
