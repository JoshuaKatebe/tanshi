import { NextRequest, NextResponse } from 'next/server'
import { getAllDonors, createDonor, deleteDonor } from '@/lib/database'

export async function GET() {
  try {
    const donors = await getAllDonors()
    return NextResponse.json(donors)
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json({ error: 'Failed to fetch donors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, bloodType, amount, donationType, location, method } = await request.json()
    
    if (!name || !amount || !donationType) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const newDonor = await createDonor({
      name: name.slice(0, 100),
      blood_type: bloodType?.slice(0, 10) || undefined,
      amount: amount.slice(0, 50),
      donation_type: donationType, // 'blood' or 'financial'
      location: location?.slice(0, 100) || undefined,
      method: method?.slice(0, 50) || undefined,
      status: 'completed'
    })
    
    return NextResponse.json(newDonor, { status: 201 })
  } catch (error) {
    console.error('Error creating donor:', error)
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