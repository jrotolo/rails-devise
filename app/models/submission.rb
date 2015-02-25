class Submission < ActiveRecord::Base
  belongs_to :user, inverse_of: :submissions
end
