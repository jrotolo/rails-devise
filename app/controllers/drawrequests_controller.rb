class DrawrequestsController < ApplicationController
  respond_to :json

  def index
    respond_with Drawrequest.all
  end

  def create
    respond_with Drawrequest.create(drawrequest_params)
  end

  private

  def drawrequest_params
    params.require(:drawrequest).permit(:body)
  end
end
