class QuizzesController < ApplicationController
  def start
    session[:score] = 0
    session[:question_ids] = Question.pluck(:id).shuffle
    session[:current_index] = 0
    redirect_to quiz_question_path(session[:question_ids][0])
  end

  def question
    @question = Question.find(params[:id])
    @answers = @question.answers.shuffle
  end

  def answer
    @question = Question.find(params[:question_id])
    selected_answer = Answer.find(params[:answer_id])
    @correct_answer = @question.answers.find_by(correct: true)

    session[:score] ||= 0
    session[:score] += 1 if selected_answer.correct?

    session[:current_index] ||= 0
    session[:current_index] += 1

    @is_correct = selected_answer.correct?
    @score = session[:score]

    if session[:current_index] < session[:question_ids].length
      @next_question_id = session[:question_ids][session[:current_index]]
    else
     @next_question_id = nil
    end

    respond_to do |format|
      format.turbo_stream
      format.html { render :answer } # fallback
    end
  end

  def result
    @score = session[:score]
    @total_questions = session[:question_ids].length
  end
end
