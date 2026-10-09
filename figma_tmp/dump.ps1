param([string]$JsonPath, [string]$NodeId)

$j = Get-Content $JsonPath -Raw | ConvertFrom-Json

function Hex($c) {
  return ('#{0:X2}{1:X2}{2:X2}' -f ([int][math]::Round($c.r * 255)), ([int][math]::Round($c.g * 255)), ([int][math]::Round($c.b * 255)))
}

function Fill($f) {
  if (-not $f -or $f.Count -eq 0) { return '' }
  $parts = @()
  foreach ($x in $f) {
    if ($x.visible -eq $false) { continue }
    if ($x.type -eq 'SOLID') {
      $op = 1
      if ($null -ne $x.opacity) { $op = $x.opacity }
      $parts += (Hex $x.color) + '@' + [math]::Round($op, 2)
    } elseif ($x.type -eq 'IMAGE') {
      $parts += 'IMAGE'
    } else {
      $parts += $x.type
    }
  }
  return ($parts -join ',')
}

function Dump($n, $depth) {
  $bb = $n.absoluteBoundingBox
  $s = ''
  if ($bb) { $s = ' @(' + [math]::Round($bb.x) + ',' + [math]::Round($bb.y) + ') ' + [math]::Round($bb.width) + 'x' + [math]::Round($bb.height) }
  $e = ''
  if ($n.visible -eq $false) { $e += ' HIDDEN' }
  if ($n.layoutMode -and $n.layoutMode -ne 'NONE') {
    $e += ' LAY=' + $n.layoutMode + '/' + $n.primaryAxisAlignItems + '/' + $n.counterAxisAlignItems
    $e += ' pad=' + $n.paddingLeft + ',' + $n.paddingTop + ',' + $n.paddingRight + ',' + $n.paddingBottom
    $e += ' gap=' + $n.itemSpacing
  }
  $f = Fill $n.fills
  if ($f) { $e += ' fill=' + $f }
  if ($n.strokes -and $n.strokes.Count -gt 0) { $e += ' stroke=' + (Fill $n.strokes) + '/' + $n.strokeWeight }
  if ($n.cornerRadius) { $e += ' r=' + $n.cornerRadius }
  if ($n.rectangleCornerRadii) { $e += ' r=(' + ($n.rectangleCornerRadii -join '/') + ')' }
  if ($n.effects -and $n.effects.Count -gt 0) {
    foreach ($ef in $n.effects) {
      if ($ef.visible -ne $false) {
        $e += ' fx=' + $ef.type + ' off(' + $ef.offset.x + ',' + $ef.offset.y + ') blur=' + $ef.radius + ' spread=' + $ef.spread + ' ' + (Hex $ef.color) + '@' + [math]::Round($ef.color.a, 2)
      }
    }
  }
  if ($n.type -eq 'TEXT') {
    $st = $n.style
    $e += ' FONT=' + $st.fontFamily + ' [' + $st.fontStyle + '] ' + $st.fontWeight + ' ' + [math]::Round($st.fontSize, 1) + 'px lh=' + [math]::Round($st.lineHeightPx, 1) + ' ls=' + [math]::Round($st.letterSpacing, 1) + ' align=' + $st.textAlignHorizontal
  }
  Write-Output (('  ' * $depth) + $n.type + ' "' + $n.name + '" ' + $n.id + $s + $e)
  if ($n.type -eq 'TEXT' -and $n.characters) {
    Write-Output (('  ' * $depth) + '   TXT: ' + ($n.characters -replace "`n", ' // '))
  }
  if ($n.children) { foreach ($c in $n.children) { Dump $c ($depth + 1) } }
}

$root = $null
if ($j.nodes) {
  $root = $j.nodes.$NodeId.document
} else {
  function FindNode($n) {
    if ($n.id -eq $NodeId) { return $n }
    if ($n.children) {
      foreach ($c in $n.children) {
        $r = FindNode $c
        if ($r) { return $r }
      }
    }
    return $null
  }
  $root = FindNode $j.document
}
Dump $root 0
