import { randomUUID } from "node:crypto"

class Question {
  public title: string
  public content: string
  public id: string
  public authorId: string

  constructor(title: string, content: string, authorId: string, id?: string) {
    this.authorId = authorId
    this.title = title
    this.content = content
    this.id = id ?? randomUUID()
  }
}