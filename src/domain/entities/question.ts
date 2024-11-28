import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  title: string
  content: string
  authorId: string
  slug: Slug
}

class Question {
  public title: string
  public content: string
  public id: string
  public authorId: string
  public slug: Slug

  constructor(props: QuestionProps, id?: string) {
    this.authorId = props.authorId
    this.title = props.title
    this.content = props.content
    this.slug = props.slug
    this.id = id ?? randomUUID()
  }
}