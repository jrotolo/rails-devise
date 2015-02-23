class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :path, :description, :user_id
end
