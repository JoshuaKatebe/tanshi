import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const commentsPath = path.join(process.cwd(), 'src/data/comments.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(commentsPath, 'utf8')
    const comments = JSON.parse(fileContents)
    // Only return approved comments for public view
    return NextResponse.json(comments.filter((comment: any) => comment.approved).sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json()
    
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    let comments = []
    try {
      const fileContents = await fs.readFile(commentsPath, 'utf8')
      comments = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    const newComment = {
      id: Date.now().toString(),
      name: name.slice(0, 50), // Limit name length
      message: message.slice(0, 500), // Limit message length
      timestamp: new Date().toISOString(),
      approved: false // Comments need admin approval
    }

    comments.push(newComment)
    
    await fs.writeFile(commentsPath, JSON.stringify(comments, null, 2))
    
    return NextResponse.json({ message: 'Comment submitted for approval' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 })
  }
}