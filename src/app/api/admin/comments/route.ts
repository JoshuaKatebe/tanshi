import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const commentsPath = path.join(process.cwd(), 'src/data/comments.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(commentsPath, 'utf8')
    const comments = JSON.parse(fileContents)
    // Return all comments for admin view
    return NextResponse.json(comments.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, approved } = await request.json()
    
    let comments = []
    try {
      const fileContents = await fs.readFile(commentsPath, 'utf8')
      comments = JSON.parse(fileContents)
    } catch (error) {
      return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
    }

    const commentIndex = comments.findIndex((comment: any) => comment.id === id)
    if (commentIndex === -1) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    comments[commentIndex].approved = approved
    
    await fs.writeFile(commentsPath, JSON.stringify(comments, null, 2))
    
    return NextResponse.json(comments[commentIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    let comments = []
    try {
      const fileContents = await fs.readFile(commentsPath, 'utf8')
      comments = JSON.parse(fileContents)
    } catch (error) {
      return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
    }

    comments = comments.filter((comment: any) => comment.id !== id)
    
    await fs.writeFile(commentsPath, JSON.stringify(comments, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}