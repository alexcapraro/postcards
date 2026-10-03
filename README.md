# Postcards

A trip journal that installs on your phone from GitHub Pages. Tag each day, save places from Google Maps with notes, photos and a time of day, read the trip back as a timeline, and turn any day into a postcard you can share.

Pilot build. It uses the same visual language as Check Please (interstate green, beige paper, Overpass), plus Caveat for the handwriting on the postcards, so it can go straight into Claude Design.

## Features

- **Trip setup**: name, first and last day. Drives "Day 5 of 37".
- **Day tab**
  - **Greetings from**: where you are today. Fills itself from the day's first place (e.g. "San Francisco" from a Tartine Bakery address). Type to override.
  - **Day tags** (Driving, Hiking, Camping…) and custom tags.
  - **Day note**: becomes the postcard message by default.
  - **Photos**: add from the camera or gallery. Shows day photos and photos attached to that day's places (marked with a pin).
  - **Postcard**: "Make a postcard of this day". Any postcards already made show here.
  - **Places**: grouped by time of day.
- **Add place**: paste a Google Maps link or share from Google Maps (Android, once installed). Time of day, optional exact time, type, notes, photos, optional GPS pin.
- **Postcard maker** (only runs when you tap it)
  - Front: your cover photo with "Greetings from" and big block lettering of the place, plus day and date.
  - Back: handwritten message, the day's stops (optional), a stamp with the day number, a postmark with place and date, and the To line.
  - Live preview, tap to flip. Saved postcards go to the Mailbox.
  - **Share** sends front and back as two 1800×1200 JPEGs through the phone's share sheet. If sharing isn't available, it downloads them instead.
- **Timeline tab**: every trip day with its greeting, tags, note, photo strip, postcard and places.
- **Places tab**: all places, with search and type filter.
- **Mailbox tab**: every postcard. Tap one to flip it, share, edit or delete it.
- **Trip tab**: trip details, tag list, backup, stats including storage used.
- **Backup**: Export saves a .zip of the data and every photo. Import merges a backup into what's already on the phone, so it can also combine two phones' journals.
- Works offline once installed, fonts included. Long-press shortcuts: Add place, Make today's postcard, Mailbox.

## How photos are stored

Photos are resized on save (1600px for full size, 360px for thumbnails) and kept in the phone's IndexedDB storage. A 36-day trip with plenty of photos is roughly 100 to 300 MB. The app asks the browser to keep this storage persistent. Clearing Chrome's site data for the app deletes everything, so export a backup every few days.

## Known limits

- **Data stays on the phone it was entered on.** Export and import merges journals from two phones, but it's manual.
- **Short maps.app.goo.gl links carry no coordinates.** They still open the right place.
- **One postcard style.** Extra styles (vintage linen, national park poster) are on the list.

## Phase 2 options

1. Shared journal across both phones (Firebase or Supabase plus sign-in)
2. Map view of places (Leaflet plus OpenStreetMap)
3. Postcard styles
4. Trip stamps for each park or state visited
5. Postcard book PDF at the end of the trip
6. Share photos straight into the app from the gallery (share target for images)

## Screens (for Claude Design)

1. Welcome / trip setup
2. Day (tab)
3. Timeline (tab)
4. Places (tab)
5. Mailbox (tab)
6. Trip (tab)
7. Postcard composer (full screen)
8. Sheets: Add/Edit place, Place detail, Postcard viewer, New tag
9. Photo viewer (full screen, dark)
10. The postcard artwork itself: front and back, drawn in `drawFront` and `drawBack` in `index.html`

## Data model

```json
{
  "trip": { "name": "USA 2026", "start": "2026-10-01", "end": "2026-11-06" },
  "tagLib": ["Driving", "Hiking"],
  "days": { "2026-10-03": { "tags": ["City"], "note": "…", "greet": "San Francisco", "photos": ["id1"] } },
  "places": [{ "id": "…", "date": "2026-10-03", "slot": "breakfast", "time": "", "name": "Tartine Bakery",
               "address": "…", "url": "…", "lat": null, "lng": null, "cat": "Food", "notes": "…", "photos": ["id2"] }],
  "cards": [{ "id": "…", "date": "2026-10-03", "photoId": "id1", "greet": "San Francisco", "msg": "…",
              "to": "Mum and Dad", "showStops": true, "created": 0, "updated": 0 }]
}
```

The data lives in `localStorage` (`postcards-v1`). Images live in IndexedDB (`postcards`), keyed `p:<id>` (photo), `t:<id>` (thumbnail) and `c:<cardId>` (postcard thumbnail). Data from the earlier Roadbook pilot is picked up automatically if it was on the same site.

## Deploy

1. Create a new GitHub repo called `postcards` and upload everything in this folder, including the `fonts` folder, to the root.
2. Go to Settings, then Pages, and deploy from the `main` branch, root folder.
3. Open `https://alexcapraro.github.io/postcards/` in Chrome on Android, then choose ⋮, then **Install app**. On iPhone, use Safari, then Share, then Add to Home Screen.
4. Open it once while online.

**Updating:** bump `VERSION` in `sw.js` (`postcards-v2` and so on) with every upload, then open the app twice.

## Licences

Overpass and Caveat are SIL Open Font License. The licence files are in `fonts/`.
