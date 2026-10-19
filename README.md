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
- **Two PINs:** the **sales PIN** can sell, edit and look up tickets, but can't check
  anyone in. The **check-in PIN** can only look up and check in tickets. Gate
  volunteers never see the Sell tab, and sales desks never see a Check in button.
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
8. **Set your two PINs.** Near the top, find these lines:
   ```
   const SALES_PIN   = 'CHANGE-ME-SALES';
   const CHECKIN_PIN = 'CHANGE-ME-GATE';
   ```
   Replace each one with your own PIN, keeping the quote marks, e.g. `'cas-sell-4821'` and `'cas-gate-7390'`.
   - **Sales PIN:** for the sales desk and organisers. It can sell, edit, look up tickets, and open the Excel link in Part 9. It **can't** check anyone in.
   - **Check-in PIN:** for gate volunteers. It can only look up and check in tickets.

   Make them different. Use only letters, numbers and dashes, because the sales PIN also goes into the Excel link. Write both down.
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

   "Anyone" is needed so that phones can connect without signing in to Google. The PINs are what keep strangers out.
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

1. On the site, type a desk name like `Test laptop` and your **sales PIN**, then press **Start**. The grey "Demo mode" bar should **not** appear. If it does, `config.js` wasn't saved properly.
2. Go to **Sell ticket**. Pick Golden, type a fake name and a fake phone number of **at least 7 digits** (shorter numbers are rejected), and press **Save**.
3. Open your Google Sheet. The row should be there with a yellow background.
4. Go to **Look up**, search the fake name and tap it. There should be **no** Check in button, only a note saying the gate checks people in.
5. **Switch to the check-in PIN.** Tap the desk name at the top right to sign out, then sign in again with the **check-in PIN**. The **Sell ticket** tab should be gone, the first tab should say **Check in**, and the desk name should show `· Check-in`.
6. Search the fake name, tap it and press **Check in**. The row in the sheet should turn green.
7. Open the site on your phone as well, signed in with either PIN. The same ticket should show there, which proves the devices are syncing. On the check-in PIN, try checking it in again. You should get the red **Already checked in** warning.
8. **Delete the test ticket before real sales start.** In the sheet, right-click the row number of the test row and choose **Delete row**. Otherwise real tickets will start from #2. This is the one time you should edit the sheet by hand; after this, every change goes through the website.

## Part 8: Set up the team

1. **Phones:** send the site link privately, not in a big group chat. Give the **check-in PIN** to gate volunteers and the **sales PIN** only to the sales desk and organisers.
2. **Each device:** open the link, enter a desk name (`Gate 1`, `Gate 2`, `Sales desk`) and its PIN. It stays signed in after that.
3. **Make it look like an app (optional):**
   - **iPhone:** open the link in Safari, tap **Share**, then **Add to Home Screen**.
   - **Android:** open it in Chrome, tap **⋮**, then **Add to Home screen**.
4. **Share the sheet with organisers:** in the Google Sheet, click **Share**, add their emails, and set them to **Viewer**. Nobody should type in the sheet directly. All sales and check-ins should go through the website, which is what keeps ticket numbers unique.

## Part 9 (optional): Keep a live copy in Excel

Excel reads the tickets from your script, so changes in Excel never touch the real
data. You'll need desktop Excel on Windows or Mac.

1. **Make your Excel link.** Take your Web app URL from Part 3 and add
   `?format=csv&pin=` followed by your **sales PIN** to the end. The check-in PIN won't work here:
   ```
   https://script.google.com/macros/s/AKfy.../exec?format=csv&pin=cas-sell-4821
   ```
2. **Test it.** Paste the link into a browser. A file called `casnival-tickets.csv`
   should download. If you see `Wrong PIN.` instead, check the sales PIN at the end of the link.
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
   inside the link, the sales PIN.

If you change the sales PIN later, update the link: right-click the query, choose **Edit**,
then **Source** (the ⚙️ next to it), and change the PIN at the end.

---

## On the event day

- Charge every phone and bring power banks. Make sure each gate has mobile data or Wi-Fi.
- Just before gates open, go to **Overview** and tap **Download CSV backup** on one phone. If the internet drops, you can still look people up in that file and note check-ins on paper, then enter them later.
- The dot at the top of the site shows **Live** when it's working. If it says **Offline**, check that device's internet.

## If something goes wrong

| Problem | Fix |
|---|---|
| "Wrong PIN" | It must match one of the two PINs in the script exactly. Capital letters count. |
| "The check-in PIN can only check people in" | That device is signed in with the check-in PIN. Sign out (tap the desk name) and sign in with the sales PIN. |
| No **Sell ticket** tab | Same as above: the device is using the check-in PIN. |
| "The sales PIN can't check people in" or no **Check in** button | That device is signed in with the sales PIN. Send the person to the gate, or sign in with the check-in PIN. |
| "Could not reach the ticket sheet" | Check that the URL in `config.js` ends in `/exec`, and that **Who has access** is set to **Anyone**. Opening the URL in a browser should show `CASnival ticket API is running.` |
| Site still shows "Demo mode" | The URL isn't in `config.js`, or GitHub hasn't updated yet. Wait 2 minutes, then hard refresh with **Cmd+Shift+R** / **Ctrl+Shift+R**. |
| You changed the script or a PIN | Go to **Deploy → Manage deployments**, click ✏️, set **Version** to **New version**, then **Deploy**. The link stays the same. Devices using a PIN you changed are signed out and need the new one. |
| GitHub site shows a 404 | Wait a couple of minutes after turning on Pages, and make sure `index.html` is spelled exactly like that. |

## Privacy

The sheet holds students' and parents' phone numbers and emails.

- The website code is public, but **the data is not**. The script refuses every request without one of the PINs.
- Don't post the PINs or the site link in big group chats. The check-in PIN goes to gate volunteers, the sales PIN only to the sales desk and organisers.
- The Excel workbook from Part 9 holds the same data and the sales PIN. Only share it with organisers.
- Don't use Google's **File → Share → Publish to web** to connect Excel. It makes the whole sheet public.
- After the event, change both PINs in the script and redeploy, or archive the deployment.

## Trying it without the sheet

If `API_URL` in `config.js` is empty, the site runs in **demo mode** with sample
data stored only on that device. The demo PINs are `1234` (sales) and `5678` (check-in).
