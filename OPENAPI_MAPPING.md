# OpenAPI Mapping

Source: http://localhost:8080/v3/api-docs
Generated: 2025-12-29

## Summary
This file maps OpenAPI endpoints (from the `openapi.json` saved at project root) to places in the frontend repository where the paths or operationIds appear. It also lists endpoints that appear to be missing client implementations and suggests locations for new client wrappers.

## How to regenerate
1. curl -sS http://localhost:8080/v3/api-docs -o openapi.json
2. jq -r '.paths | to_entries[] | .key as $p | .value | to_entries[] | "\($p) \(.key) \(.value.operationId // "")"' openapi.json > openapi_paths.txt
3. awk '{print $1}' openapi_paths.txt | sort -u > openapi_paths_only.txt
4. awk '{print $3}' openapi_paths.txt | sort -u | grep -v '^$' > openapi_operationIds_only.txt
5. Search repository for matches (example):
   - grep -Rin --exclude-dir=node_modules --exclude-dir=.git --f openapi_paths_only.txt || true
   - grep -Rin --exclude-dir=node_modules --exclude-dir=.git --f openapi_operationIds_only.txt || true

## Mapping (paths found in openapi.json)
- /api/users/{id} [GET] operationId: getById — referenced in repository (see `openapi_path_matches_grep.txt` / `openapi_operation_matches_grep.txt`)
- /api/users/{id} [PUT] operationId: update — referenced in repository
- /api/users/{id} [DELETE] operationId: delete — referenced in repository
- /api/companies/{id} [GET] operationId: getById_1 — referenced in repository
- /api/companies/{id} [PUT] operationId: update_1 — referenced in repository
- /api/companies/{id} [DELETE] operationId: delete_1 — referenced in repository
- /api/availability/{id} [GET] operationId: getById_2 — referenced in repository
- /api/availability/{id} [PUT] operationId: update_2 — referenced in repository
- /api/availability/{id} [DELETE] operationId: delete_2 — referenced in repository
- /api/appointments/{id}/reschedule [PUT] operationId: reschedule — NOT found in repository — suggested: `src/app/services/api/appointments.ts` -> `rescheduleAppointment`
- /api/users [GET] operationId: list — referenced in repository
- /api/users [POST] operationId: create — referenced in repository
- /api/notifications [GET] operationId: list_1 — referenced in repository
- /api/notifications [POST] operationId: create_1 — referenced in repository
- /api/notifications/{id}/mark-sent [POST] operationId: markAsSent — NOT found in repository — suggested: `src/app/services/api/notifications.ts` -> `markNotificationAsSent`
- /api/notifications/process [POST] operationId: processScheduled — NOT found in repository — suggested: `src/app/services/api/notifications.ts` -> `processScheduledNotifications`
- /api/companies [GET] operationId: list_2 — referenced in repository
- /api/companies [POST] operationId: create_2 — referenced in repository
- /api/availability [GET] operationId: list_3 — referenced in repository
- /api/availability [POST] operationId: create_3 — referenced in repository
- /api/appointments [GET] operationId: list_4 — referenced in repository
- /api/appointments [POST] operationId: create_4 — referenced in repository
- /api/appointments/{id}/confirm [POST] operationId: confirm — NOT found in repository — suggested: `src/app/services/api/appointments.ts` -> `confirmAppointment`
- /api/users/by-phone [GET] operationId: findByPhone — referenced in repository
- /api/users/by-email [GET] operationId: findByEmail — referenced in repository
- /api/notifications/{id} [GET] operationId: getById_3 — referenced in repository
- /api/notifications/{id} [DELETE] operationId: delete_3 — referenced in repository
- /api/appointments/{id} [GET] operationId: getById_4 — referenced in repository
- /api/appointments/{id} [DELETE] operationId: cancel — referenced in repository

## Endpoints likely missing client code (summary)
- PUT /api/appointments/{id}/reschedule (reschedule)
- POST /api/notifications/{id}/mark-sent (markAsSent)
- POST /api/notifications/process (processScheduled)
- POST /api/appointments/{id}/confirm (confirm)

Suggested files for implementations:
- src/app/services/generated/ (generated types if using openapi-typescript)
- src/app/services/api/appointments.ts
- src/app/services/api/notifications.ts

## Example client function (recommended style)
Signature:
async function confirmAppointment(appointmentId: string): Promise<void>
Description: POST to `/api/appointments/{id}/confirm` — throws on non-2xx, returns parsed JSON on success.

## Next steps
1. Choose generation strategy: (A) generate types with `openapi-typescript` and handwrite small wrappers; (B) generate full client with `openapi-generator`.
2. Implement the missing wrappers in `src/app/services/api/` and add small unit tests.
3. Link `OPENAPI_MAPPING.md` from the root `README.md`.



