import { randomUUID } from "node:crypto"

interface QuestionProps {
  title: string
  content: string
  authorId: string
}

class Question {
  public title: string
  public content: string
  public id: string
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.authorId = props.authorId
    this.title = props.title
    this.content = props.content
    this.id = id ?? randomUUID()
  }
}