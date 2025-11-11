import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const updatesPath = path.join(process.cwd(), 'src/data/updates.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(updatesPath, 'utf8')
    const updates = JSON.parse(fileContents)
    return NextResponse.json(updates.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, author } = await request.json()
    
    let updates = []
    try {
      const fileContents = await fs.readFile(updatesPath, 'utf8')
      updates = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    const newUpdate = {
      id: Date.now().toString(),
      title,
      content,
      timestamp: new Date().toISOString(),
      author
    }

    updates.push(newUpdate)
    
    await fs.writeFile(updatesPath, JSON.stringify(updates, null, 2))
    
    return NextResponse.json(newUpdate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    let updates = []
    try {
      const fileContents = await fs.readFile(updatesPath, 'utf8')
      updates = JSON.parse(fileContents)
    } catch (error) {
      return NextResponse.json({ error: 'Updates not found' }, { status: 404 })
    }

    updates = updates.filter((update: any) => update.id !== id)
    
    await fs.writeFile(updatesPath, JSON.stringify(updates, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete update' }, { status: 500 })
  }
}