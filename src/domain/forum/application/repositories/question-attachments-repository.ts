export interface QuestionAttachmentsRepository {
  findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>
}
