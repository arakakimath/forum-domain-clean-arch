import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): 
  create(questionComment: QuestionComment): Promise<void>
}
