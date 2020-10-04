class Api::V1::FruitsController < ApplicationController

  # GET /fruits
  def index
    @fruits = Fruit.all

    render json: @fruits
  end

  def names
    names = Fruit.select(:name).distinct(:name)

    render json: names
  end

  # POST /fruits
  def create
    @fruit = Fruit.create(fruit_params)

    render json: @fruit, status: :created
  end

  private

    # Only allow a trusted parameter "white list" through.
    def fruit_params
      fruits = params.require(:fruits)
      result = []
      fruits.each do |f|
        result.push({
          name: f[1],
          description: f[2],
          date: f[3] || Time.now
        }) if (f.try(:size) || 0) > 0
      end

      return result
    end
end
