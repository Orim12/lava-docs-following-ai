import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Payload CMS',
	description: 'Payload CMS Admin',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
