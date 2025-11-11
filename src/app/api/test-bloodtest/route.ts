import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request data
    const body = await request.json()
    console.log('Received bloodtest data:', body)
    
    // Check required fields
    const { name, phone, age, location } = body
    
    if (!name || !phone || !age || !location) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        received: { name: !!name, phone: !!phone, age: !!age, location: !!location },
        data: body
      }, { status: 400 })
    }
    
    // Return success with the data we would process
    return NextResponse.json({ 
      success: true,
      message: 'Test successful - data received correctly',
      processedData: {
        name: String(name).slice(0, 100),
        phone: String(phone).slice(0, 20),
        age: String(age).slice(0, 3),
        location: String(location).slice(0, 100),
        previouslyTested: Boolean(body.previouslyTested),
        knownBloodType: body.knownBloodType ? String(body.knownBloodType).slice(0, 10) : '',
        medicalConditions: body.medicalConditions ? String(body.medicalConditions).slice(0, 500) : 'None',
        email: body.email ? String(body.email).slice(0, 100) : ''
      }
    })
    
  } catch (error) {
    console.error('Test bloodtest error:', error)
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Bloodtest test endpoint is working',
    timestamp: new Date().toISOString()
  })
}