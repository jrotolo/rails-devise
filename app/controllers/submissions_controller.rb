class SubmissionsController < ApplicationController
  respond_to :json

  def index
    respond_with Submission.all
  end

  def create
    respond_with Submission.create(submission_params)
  end

  private

  def submission_params
    params.require(:submission).permit(:path, :description)
  end
end
