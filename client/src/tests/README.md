# Freelancer React Tests

## Run tests

From the repository root:
npm --prefix client ci
npm --prefix client test

Watch mode:
npm --prefix client run test:watch

## Setup

Tools: Vitest, React Testing Library, user-event, jest-dom and jsdom.
Configuration: client/vitest.config.js
Shared setup: client/src/tests/setup.js

## Coverage

25 tests across six files cover:
- Create Gig: submission, validation, retry and pending controls.
- Edit Gig: existing values, cancellation, updates, validation and retry.
- Delete Gig: confirmation, cancellation, deletion, retry and pending controls.
- Dashboard: account details, own gigs, empty state, recovery and logout.
- Received bookings: rendering, empty state, recovery and missing references.
- Income: totals display, transaction history, empty state, recovery and invalid responses.

API responses are mocked. Tests do not access MongoDB or modify records.
Backend JWT, permissions, ownership, booking transactions and income calculations require separate API tests.

## Recorded results

All 25 tests passed across six test files.
Production build and ESLint passed.
npm audit reported zero vulnerabilities.

Report: Evidence/Testing/freelancer-react-results.json

To regenerate the report, run inside client:
npm test -- --reporter=verbose --reporter=json --outputFile=../Evidence/Testing/freelancer-react-results.json
