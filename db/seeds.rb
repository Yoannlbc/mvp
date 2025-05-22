# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Suppression des anciennes données..."
Answer.destroy_all
Question.destroy_all

puts "Création des questions et réponses..."

questions = [
  {
    content: "Qui a le plus de titres NBA ?",
    answers: [
      ["Bill Russell", true],
      ["Michael Jordan", false],
      ["Kobe Bryant", false],
      ["Magic Johnson", false]
    ]
  },
  {
    content: "Quel joueur est surnommé 'King James' ?",
    answers: [
      ["LeBron James", true],
      ["James Harden", false],
      ["Larry Bird", false],
      ["Kawhi Leonard", false]
    ]
  },
  {
    content: "Quel joueur détient le record du plus grand nombre de passes décisives en NBA ?",
  answers: [
    ["John Stockton", true],
    ["Magic Johnson", false],
    ["Chris Paul", false],
    ["Steve Nash", false]
    ]
  },
  {
    content: "Quelle équipe a remporté le plus de titres NBA ?",
    answers: [
      ["Boston Celtics", true],
      ["Chicago Bulls", false],
      ["Golden State Warriors", false],
      ["Miami Heat", false]
    ]
  },
  {
    content: "Quel joueur détient le record de points marqués en un match NBA ?",
    answers: [
      ["Wilt Chamberlain", true],
      ["Kobe Bryant", false],
      ["Michael Jordan", false],
      ["Luka Dončić", false]
    ]
  },
  {
    content: "Quel joueur a popularisé le tir à trois points dans les années 2010 ?",
    answers: [
      ["Stephen Curry", true],
      ["Ray Allen", false],
      ["Dirk Nowitzki", false],
      ["Damian Lillard", false]
    ]
  },
  {
    content: "Quelle franchise joue à Los Angeles ?",
    answers: [
      ["Lakers", true],
      ["Celtics", false],
      ["Knicks", false],
      ["Bulls", false]
    ]
  },
  {
    content: "Qui est le meilleur rebondeur de l'histoire NBA ?",
    answers: [
      ["Wilt Chamberlain", true],
      ["Shaquille O'Neal", false],
      ["Dennis Rodman", false],
      ["Tim Duncan", false]
    ]
  },
  {
    content: "Quel joueur a le plus de MVP ?",
    answers: [
      ["Kareem Abdul-Jabbar", true],
      ["Michael Jordan", false],
      ["LeBron James", false],
      ["Nikola Jokic", false]
    ]
  },
  {
    content: "Quel joueur a été drafté en 13e position en 1996 ?",
    answers: [
      ["Kobe Bryant", true],
      ["Steve Nash", false],
      ["Allen Iverson", false],
      ["Ray Allen", false]
    ]
  },
  {
    content: "Quel pays a remporté la Coupe du Monde FIBA 2019 ?",
    answers: [
      ["Espagne", true],
      ["USA", false],
      ["France", false],
      ["Serbie", false]
    ]
  },
  {
    content: "Combien y a-t-il de joueurs sur le terrain (au total) ?",
    answers: [
      ["10", true],
      ["5", false],
      ["6", false],
      ["12", false]
    ]
  },
  {
    content: "Quel joueur français a été drafté 1er en 2023 ?",
    answers: [
      ["Victor Wembanyama", true],
      ["Evan Fournier", false],
      ["Killian Hayes", false],
      ["Rudy Gobert", false]
    ]
  },
  {
    content: "Quel joueur a remporté un titre avec Dallas en 2011 ?",
    answers: [
      ["Dirk Nowitzki", true],
      ["Jason Kidd", false],
      ["LeBron James", false],
      ["Chris Bosh", false]
    ]
  },
  {
    content: "Quel joueur a été surnommé 'The Answer' ?",
    answers: [
      ["Allen Iverson", true],
      ["Paul Pierce", false],
      ["Dwyane Wade", false],
      ["Chris Paul", false]
    ]
  },
  {
    content: "Quel est le nom de la ligue féminine américaine ?",
    answers: [
      ["WNBA", true],
      ["NBA Women", false],
      ["FBA", false],
      ["USA Pro Women", false]
    ]
  },
  {
    content: "Combien de temps dure un quart-temps en NBA ?",
    answers: [
      ["12 minutes", true],
      ["10 minutes", false],
      ["8 minutes", false],
      ["15 minutes", false]
    ]
  },
  {
    content: "Quel joueur a été drafté directement depuis le lycée ?",
    answers: [
      ["LeBron James", true],
      ["Stephen Curry", false],
      ["Giannis Antetokounmpo", false],
      ["Joel Embiid", false]
    ]
  },
  {
    content: "Quel joueur a joué toute sa carrière aux Spurs ?",
    answers: [
      ["Tim Duncan", true],
      ["Tony Parker", false],
      ["Kawhi Leonard", false],
      ["David Robinson", false]
    ]
  },
  {
    content: "Qui est surnommé 'The Greek Freak' ?",
    answers: [
      ["Giannis Antetokounmpo", true],
      ["Nikola Jokic", false],
      ["Luka Dončić", false],
      ["Kristaps Porzingis", false]
    ]
  }
]

questions.each do |q_data|
  q = Question.create!(content: q_data[:content])
  q_data[:answers].each do |answer_content, is_correct|
    q.answers.create!(content: answer_content, correct: is_correct)
  end
end

puts "✅ 20 questions créées avec succès !"
