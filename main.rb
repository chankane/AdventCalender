require "matrix"

$size
$args

$hasSolved
$ans
$field

def cre_field
  # $field = new Array[$size][$size][$size]
  field = Array.new($size + 2).map {
    Array.new($size + 2).map { Array.new($size + 2, true) }
  }

  for z in 0...$size
    for y in 0...$size
      for x in 0...$size
        field[z][y][x] = false
      end
    end
  end

  field
end

def solve(depth, pos, dir)
  if depth >= $size * $size * $size
    $hasSolved = true
    return
  end

  if $field[pos[2]][pos[1]][pos[0]]
    return
  end

  $field[pos[2]][pos[1]][pos[0]] = true

  if $args[depth]
    for e in cre_dir_of_right_angle(dir)
      solve(depth + 1, pos + e, e)
      if $hasSolved
        $ans.unshift(dir_to_str(e))
        return
      end
    end
  else
    solve(depth + 1, pos + dir, dir)
    if 0 == depth && $hasSolved
      $ans.unshift(dir_to_str(dir))
    end
  end

  $field[pos[2]][pos[1]][pos[0]] = false
end

def cre_dir_of_right_angle(dir)
  [
    Vector[ 1,  0,  0],
    Vector[-1,  0,  0],
    Vector[ 0,  1,  0],
    Vector[ 0, -1,  0],
    Vector[ 0,  0,  1],
    Vector[ 0,  0, -1],
  ].reject { |e| e == dir || e == -dir }
end

def dir_to_str(dir)
  case dir
  when Vector[ 1,  0,  0]
    "Right"
  when Vector[-1,  0,  0]
    "Left"
  when Vector[ 0,  1,  0]
    "Up"
  when Vector[ 0, -1,  0]
    "Down"
  when Vector[ 0,  0,  1]
    "Back"
  when Vector[ 0,  0, -1]
    "Forward"
  else
    "Not Direction"
  end
end

$size = 3
$args = [0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0]
$args.map! { |e| e > 0}

$hasSolved = false
$ans = []
$field = cre_field

solve(0, Vector[0, 0, 0], Vector[1, 0, 0])

if $hasSolved
  puts $ans.join("\n")
else
  puts "No answer..."
end

