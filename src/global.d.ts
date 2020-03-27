interface DataRow {
  name: string
  '2019': number
  '2020': number | null
}


type SelectedItem = |
  'closed' |
  'suspended' |
  'closed-suspended' |
  'opened' |
  'reopened' |
  'opened-reopened';
