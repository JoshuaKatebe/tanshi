import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const donorsPath = path.join(process.cwd(), 'src/data/donors.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(donorsPath, 'utf8')
    const donors = JSON.parse(fileContents)
    return NextResponse.json(donors.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, bloodType, amount, donationType, location, method } = await request.json()
    
    if (!name || !amount || !donationType) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    let donors = []
    try {
      const fileContents = await fs.readFile(donorsPath, 'utf8')
      donors = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    const newDonor = {
      id: Date.now().toString(),
      name: name.slice(0, 100),
      bloodType: bloodType?.slice(0, 10) || '',
      amount: amount.slice(0, 50),
      donationType: donationType, // 'blood' or 'financial'
      timestamp: new Date().toISOString(),
      location: location?.slice(0, 100) || '',
      method: method?.slice(0, 50) || '',
      status: 'completed'
    }

    donors.push(newDonor)
    
    await fs.writeFile(donorsPath, JSON.stringify(donors, null, 2))
    
    return NextResponse.json(newDonor, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add donor record' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    let donors = []
    try {
      const fileContents = await fs.readFile(donorsPath, 'utf8')
      donors = JSON.parse(fileContents)
    } catch (error) {
      return NextResponse.json({ error: 'Donors not found' }, { status: 404 })
    }

    donors = donors.filter((donor: any) => donor.id !== id)
    
    await fs.writeFile(donorsPath, JSON.stringify(donors, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete donor record' }, { status: 500 })
  }
}