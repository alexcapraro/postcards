# Postcards

A trip journal that installs on your phone from GitHub Pages. Log each day, save places straight from Google Maps, add photos, read the trip back as a journey, and turn any day into a postcard you can share.

Version 2 uses the desert road design: a sand background, espresso text, burnt orange for actions and ochre for highlights. Headings are Young Serif, the interface is Hanken Grotesk, dates and stamps are Overpass Mono, handwriting is Caveat and the postcard lettering is Alfa Slab One. All fonts are bundled, so it works offline.

## Features

- **Trip setup**: name, first and last day. Drives "Day 7 of 36".
- **Tab bar**: Today, Journey, a raised **+** in the middle, Mailbox, Trip.
- **Today**
  - **Greetings from**: where you are today, in big type. Fills itself from the day's places. Type to override.
  - **Progress strip**: where today sits in the trip, and how many days are left.
  - **Photos**: the cover photo large, a second photo, and an Add tile. Tap any photo to view them all.
  - **Make today's postcard**: tells you whether the photo and note are ready.
  - **Day tags**, and **Today's note** on lined paper. The note becomes the postcard message.
  - **The day's stops**: places down a dotted route line, by time of day.
- **+ button**: add a place, add photos, or make a postcard for the day you're looking at.
- **Quick save from Google Maps** (Android): in Google Maps, tap Share on a place and choose Postcards. It saves straight to today, with the time of day taken from the clock (before 4:30am counts as Night). A toast offers **Edit** and **Undo**. Sharing the same place twice within 10 minutes doesn't make a duplicate. A share with no place name (a bare link) opens the Add place sheet instead. Turn it off on the Trip tab to always get the sheet.
- **Add place**: paste a Google Maps link, or type it in. Time of day, optional exact time, type, notes, photos, optional GPS pin.
- **Postcard maker** (only runs when you tap it)
  - Three styles: **Large letter** (photo with big slab lettering), **Park poster** (espresso frame, ochre title, warm-toned photo), **Linen** (textured card, bordered photo, handwritten caption). The last style you used is the default next time.
  - Back: handwritten message, the day's stops (optional), a stamp with the day number, a postmark with place and date, and the To line.
  - With no photo picked, the front uses a drawn desert scene.
  - Live preview, tap to flip. Saved postcards go to the Mailbox.
  - **Share** sends front and back as two 1800×1200 JPEGs through the phone's share sheet. If sharing isn't available, it downloads them.
- **Journey**: Timeline (newest day first, today highlighted) and Places (search and type filter) on one tab.
- **Mailbox**: every postcard. Tap one to flip it, share, edit or delete it.
- **Trip**: stats, a **stamp book** (one stamp for each new "Greetings from" place, in the order you reached it), a **backup reminder** that turns sand-coloured after 3 days without a backup, the quick save switch, day tags and storage used.
- **Backup**: Back up now saves a .zip of the data and every photo. Import merges a backup into what's already on the phone, so it can also combine two phones' journals.
- Long-press shortcuts on the app icon: Add place, Make today's postcard, Mailbox.

## Upgrading from the pilot

Everything already on the phone carries over: same storage keys, same data. The first time v2 opens, it redraws existing Mailbox thumbnails in the new style. Postcards made in the pilot become Large letter cards.

## How photos are stored

Photos are resized on save (1600px for full size, 360px for thumbnails) and kept in the phone's IndexedDB storage. A 36-day trip with plenty of photos is roughly 100 to 300 MB. The app asks the browser to keep this storage persistent. Clearing Chrome's site data for the app deletes everything, so back up every few days.

## Known limits

- **Data stays on the phone it was entered on.** Export and import merges journals from two phones, but it's manual.
- **Quick save needs Android.** iPhones don't let web apps appear in the share sheet; paste the link instead.
- **Short maps.app.goo.gl links carry no coordinates.** They still open the right place.
- **No map view yet.**

## Next options

1. Timeline import from Google Maps (Android Timeline export file)
2. Map view of places (Leaflet plus OpenStreetMap)
3. Shared journal across both phones (Firebase or Supabase plus sign-in)
4. Postcard book PDF at the end of the trip
5. Share photos straight into the app from the gallery (share target for images)

## Data model

```json
{
  "trip": { "name": "USA 2026", "start": "2026-10-02", "end": "2026-11-06" },
  "tagLib": ["Driving", "Hiking"],
  "days": { "2026-10-03": { "tags": ["City"], "note": "…", "greet": "San Francisco", "photos": ["id1"] } },
  "places": [{ "id": "…", "date": "2026-10-03", "slot": "breakfast", "time": "", "name": "Tartine Bakery",
               "address": "…", "url": "…", "lat": null, "lng": null, "cat": "Food", "notes": "…", "photos": ["id2"] }],
  "cards": [{ "id": "…", "date": "2026-10-03", "photoId": "id1", "greet": "San Francisco", "msg": "…",
              "to": "Mum and Dad", "showStops": true, "style": "letter", "created": 0, "updated": 0 }],
  "quickSave": true, "lastBackup": 0, "lastStyle": "letter"
}
```

The data lives in `localStorage` (`postcards-v1`). Images live in IndexedDB (`postcards`), keyed `p:<id>` (photo), `t:<id>` (thumbnail) and `c:<cardId>` (postcard thumbnail).

## Deploy

1. Upload everything in this folder to the root of the `postcards` repo, replacing the old files. Include the `fonts` folder, and delete the old `overpass-latin-*.woff2` files from it if you like (they're no longer used).
2. Pages is already set up, so it redeploys on its own within a minute or two.
3. Open the app twice while online to pick up the update.
4. If **Postcards** doesn't appear in Google Maps' share menu, uninstall the app and install it again from Chrome (⋮, then **Install app**).

**Updating later:** bump `VERSION` in `sw.js` (`postcards-v3` and so on) with every upload, then open the app twice.

## Licences

Young Serif, Hanken Grotesk, Alfa Slab One, Overpass Mono and Caveat are SIL Open Font License. The licence files are in `fonts/`.
