Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

  get '/quiz', to: 'quizzes#start', as: :start_quiz
  get '/quiz/question/:id', to: 'quizzes#question', as: :quiz_question
  post '/quiz/answer', to: 'quizzes#answer', as: :submit_answer
  get '/quiz/result', to: 'quizzes#result', as: :quiz_result
end
