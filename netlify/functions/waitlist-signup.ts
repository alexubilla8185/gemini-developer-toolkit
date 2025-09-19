interface RequestBody {
    email: string;
}

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { email } = (await req.json()) as RequestBody;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // In a real application, you would save the email to a database
        // or a service like Mailchimp, ConvertKit, etc.
        // For this example, we'll just log it to the console.
        console.log(`New waitlist sign-up: ${email}`);

        return new Response(JSON.stringify({ message: 'Successfully joined the waitlist!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error in waitlist-signup function:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};