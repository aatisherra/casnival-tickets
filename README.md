# CASnival 2026 — Ticket Desk

A live ticket sales and check-in system for CASnival. Every phone and laptop
that opens the site shares the same data, and every sale and check-in is
written straight into a Google Sheet the whole team can open.

**How it fits together**

```
 Phones / laptops  ──►  Website (GitHub Pages)  ──►  Google Apps Script  ──►  Google Sheet
   (any number)          index.html + config.js       apps-script/Code.gs      "Tickets" + "Log" tabs
```

- **Check in:** search by ticket number, name, phone, email or parent name. A
  ticket that was already used shows a red *Already checked in* warning with the
  time and desk.
- **Sell ticket:** Regular or ★ Golden, Presale or On-spot. Type the number
  printed on the ticket, or leave it blank to get the next free number. Two desks
  can never be given the same number.
- **Overview:** arrivals, Regular vs Golden, presale vs on-spot, check-ins per
  desk, and a CSV backup download.
- **Excel copy (optional):** Excel can load all the tickets from a PIN-protected
  link and refresh them every few minutes. The Google Sheet stays the real
  record, and the Excel copy is for viewing only.

---

# Setup guide

The whole setup takes about 20–30 minutes and is best done on a laptop. You'll
need a Google account and this `casnival-checkin` folder.

## Part 0: Check the files

Open the `casnival-checkin` folder. Inside are `index.html`, `config.js`,
`README.md` and a folder called `apps-script`, which contains `Code.gs`.

## Part 1: Create the Google Sheet

1. Open Chrome, make sure you're signed in to Google, and go to **sheets.new**. A blank spreadsheet opens.
2. Click **Untitled spreadsheet** at the top left and rename it `CASnival 2026 Tickets`.
3. In the menu bar, click **Extensions → Apps Script**. A new tab opens with a code editor.
4. Click the title **Untitled project** at the top and rename it `CASnival Ticket API`.
5. Open `Code.gs` from the `apps-script` folder on your computer:
   - **Mac:** right-click it, then **Open With → TextEdit**.
   - **Windows:** right-click it, then **Open with → Notepad**.
6. Select all the text (**Cmd+A** on Mac, **Ctrl+A** on Windows) and copy it (**Cmd+C** / **Ctrl+C**).
7. Go back to the Apps Script tab. Click inside the editor, select everything there, delete it, and paste your copied code.
8. **Set your PIN.** Near the top, find this line:
   ```
   const PIN = 'CHANGE-ME-2026';
   ```
   Replace `CHANGE-ME-2026` with your own PIN, keeping the quote marks, e.g. `'cas-gold-4821'`. Use only letters, numbers and dashes, because the PIN also goes into the Excel link in Part 9. Write it down, because every volunteer will need it.
9. Click the **💾 Save** icon, or press **Cmd+S** / **Ctrl+S**.

## Part 2: Run the setup once

1. In the toolbar above the code is a dropdown showing a function name. Click it and choose **setup**.
2. Click **▶ Run**.
3. A box says **Authorization required**. Click **Review permissions** and choose your Google account.
4. You'll probably see **"Google hasn't verified this app."** This is normal, because the app is your own script. Click **Advanced**, then **Go to CASnival Ticket API (unsafe)**, then **Allow**.
5. The log at the bottom should say **Execution completed**.
6. Go back to your spreadsheet tab. You should now see two tabs at the bottom, **Tickets** (with dark blue column headers) and **Log**. You can delete the empty **Sheet1** tab: right-click it and choose **Delete**.

## Part 3: Turn the script into a web link

1. In the Apps Script tab, click the blue **Deploy** button (top right), then **New deployment**.
2. Next to **Select type**, click the ⚙️ gear icon and choose **Web app**.
3. Fill in:
   - **Description:** `CASnival tickets`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`

   "Anyone" is needed so that phones can connect without signing in to Google. The PIN is what keeps strangers out.
4. Click **Deploy**. If it asks for permission again, allow it the same way as before.
5. You'll get a **Web app URL** that starts with `https://script.google.com/macros/s/` and ends with `/exec`. Click **Copy** and paste it into a note somewhere. You'll need it in Part 5.
6. Click **Done**.
7. **Quick check:** paste the Web app URL into a new browser tab. You should see a short line of text containing `CASnival ticket API is running.` If you see a Google sign-in page or an error instead, go back to **Deploy → Manage deployments** and make sure **Who has access** is `Anyone`.

## Part 4: Put the website on GitHub

1. Go to **github.com**. Sign in, or click **Sign up** and create a free account. Your username becomes part of your website link, so pick something sensible.
2. Click the **+** at the top right, then **New repository**.
3. Fill in:
   - **Repository name:** `casnival-tickets`
   - Select **Public**. This is needed for free GitHub Pages. The code is public, but the ticket data is not.
   - Leave everything else as it is.
4. Click **Create repository**.
5. On the next page, find the line *"…or **uploading an existing file**"* and click that link.
6. From your `casnival-checkin` folder, drag `index.html`, `config.js` and `README.md` into the box. You can also drag in the `apps-script` folder as a backup copy, but the website doesn't need it.
7. Scroll down and click the green **Commit changes** button.

## Part 5: Connect the website to your sheet

1. On your repository page, click **config.js**.
2. Click the ✏️ pencil icon at the top right of the file.
3. Find this line:
   ```
   API_URL: '',
   ```
   Paste your Web app URL between the two quote marks, so it looks like this:
   ```
   API_URL: 'https://script.google.com/macros/s/AKfy.../exec',
   ```
4. Click **Commit changes…**, then **Commit changes** again in the box that pops up.

## Part 6: Turn on GitHub Pages

1. At the top of your repository, click the **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** choose `main`, keep `/ (root)` next to it, and click **Save**.
4. Wait 1–2 minutes, then refresh the page. A box at the top will say **"Your site is live at"** with your link, which will look like `https://yourusername.github.io/casnival-tickets/`.
5. Click **Visit site**.

## Part 7: Test it properly

1. On the site, type a desk name like `Test laptop` and your PIN, then press **Start**. The grey "Demo mode" bar should **not** appear. If it does, `config.js` wasn't saved properly.
2. Go to **Sell ticket**. Pick Golden, type a fake name and a fake phone number of **at least 7 digits** (shorter numbers are rejected), and press **Save**.
3. Open your Google Sheet. The row should be there with a yellow background.
4. Go back to **Check in**, search the fake name, tap it and press **Check in**. The row in the sheet should turn green.
5. Open the site on your phone as well. The same ticket should show there, which proves the devices are syncing.
6. Try checking the same ticket in again. You should get the red **Already checked in** warning.
7. **Delete the test ticket before real sales start.** In the sheet, right-click the row number of the test row and choose **Delete row**. Otherwise real tickets will start from #2. This is the one time you should edit the sheet by hand; after this, every change goes through the website.

## Part 8: Set up the team

1. **Phones:** send the site link and the PIN privately to desk volunteers, not to a big group chat.
2. **Each device:** open the link, enter a desk name (`Gate 1`, `Gate 2`, `Sales desk`) and the PIN. It stays signed in after that.
3. **Make it look like an app (optional):**
   - **iPhone:** open the link in Safari, tap **Share**, then **Add to Home Screen**.
   - **Android:** open it in Chrome, tap **⋮**, then **Add to Home screen**.
4. **Share the sheet with organisers:** in the Google Sheet, click **Share**, add their emails, and set them to **Viewer**. Nobody should type in the sheet directly. All sales and check-ins should go through the website, which is what keeps ticket numbers unique.

## Part 9 (optional): Keep a live copy in Excel

Excel reads the tickets from your script, so changes in Excel never touch the real
data. You'll need desktop Excel on Windows or Mac.

1. **Make your Excel link.** Take your Web app URL from Part 3 and add
   `?format=csv&pin=` followed by your PIN to the end:
   ```
   https://script.google.com/macros/s/AKfy.../exec?format=csv&pin=cas-gold-4821
   ```
2. **Test it.** Paste the link into a browser. A file called `casnival-tickets.csv`
   should download. If you see `Wrong PIN.` instead, check the PIN at the end of the link.
3. **Load it into Excel.**
   - **Windows:** open a new workbook and click **Data → From Web**. Paste the link and click **OK**. If Excel asks how to connect, choose **Anonymous**, then **Connect**. When the preview appears, click **Load**.
   - **Mac:** open a new workbook and click **Data → Get Data (Power Query)**. If **Web** is in the list, choose it and follow the Windows steps. If it isn't, use the link from step 2 whenever you want a fresh copy: the CSV downloads and opens in Excel.
4. **Make it refresh by itself** (Windows, and Mac if step 3 worked):
   1. Click **Data → Queries & Connections**.
   2. Right-click the query, then click **Properties**.
   3. Tick **Refresh every** and set it to `5` minutes.
   4. Tick **Refresh data when opening the file**, then click **OK**.

   It only refreshes while the workbook is open. You can also click **Data → Refresh All** at any time.
5. **Save the workbook** somewhere only organisers can open. It contains phone numbers and,
   inside the link, the PIN.

If you change the PIN later, update the link: right-click the query, choose **Edit**,
then **Source** (the ⚙️ next to it), and change the PIN at the end.

---

## On the event day

- Charge every phone and bring power banks. Make sure each gate has mobile data or Wi-Fi.
- Just before gates open, go to **Overview** and tap **Download CSV backup** on one phone. If the internet drops, you can still look people up in that file and note check-ins on paper, then enter them later.
- The dot at the top of the site shows **Live** when it's working. If it says **Offline**, check that device's internet.

## If something goes wrong

| Problem | Fix |
|---|---|
| "Wrong PIN" | It must match the PIN in the script exactly. Capital letters count. |
| "Could not reach the ticket sheet" | Check that the URL in `config.js` ends in `/exec`, and that **Who has access** is set to **Anyone**. Opening the URL in a browser should show `CASnival ticket API is running.` |
| Site still shows "Demo mode" | The URL isn't in `config.js`, or GitHub hasn't updated yet. Wait 2 minutes, then hard refresh with **Cmd+Shift+R** / **Ctrl+Shift+R**. |
| You changed the script or the PIN | Go to **Deploy → Manage deployments**, click ✏️, set **Version** to **New version**, then **Deploy**. The link stays the same. If you changed the PIN, every device is signed out and needs the new PIN. |
| GitHub site shows a 404 | Wait a couple of minutes after turning on Pages, and make sure `index.html` is spelled exactly like that. |

## Privacy

The sheet holds students' and parents' phone numbers and emails.

- The website code is public, but **the data is not**. The script refuses every request without the PIN.
- Don't post the PIN or the site link in big group chats. Only share them with the desk team.
- The Excel workbook from Part 9 holds the same data and the PIN. Only share it with organisers.
- Don't use Google's **File → Share → Publish to web** to connect Excel. It makes the whole sheet public.
- After the event, change the PIN in the script and redeploy, or archive the deployment.

## Trying it without the sheet

If `API_URL` in `config.js` is empty, the site runs in **demo mode** with sample
data stored only on that device. The demo PIN is `1234`.
