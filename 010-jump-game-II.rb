# @param {Integer[]} nums
# @return {Integer}
def jump(nums)
  min_step = 0
  farthest = 0
  current_end = 0

  (0..nums.size - 2).each do |i|
    farthest = [farthest, i + nums[i]].max
    if i == current_end
      min_step += 1
      current_end = farthest
    end
  end

  min_step
end

require "minitest/autorun"

class JumpTest < Minitest::Test
  def test_example_1
    assert_equal 2, jump([2, 3, 1, 1, 4])
  end

  def test_example_2
    assert_equal 2, jump([2, 3, 0, 1, 4])
  end

  def test_single_element_needs_no_jump
    assert_equal 0, jump([0])
  end

  def test_two_elements_one_jump
    assert_equal 1, jump([1, 0])
  end

  def test_one_big_jump_reaches_end
    assert_equal 1, jump([5, 0, 0, 0, 0, 0])
  end

  def test_all_ones_must_step_every_index
    assert_equal 4, jump([1, 1, 1, 1, 1])
  end

  def test_smaller_first_jump_is_optimal
    # jumping +1 to index 1 (value 3) reaches the end in 2, beating greedy +2
    assert_equal 2, jump([2, 3, 1, 1, 4])
  end

  def test_prefer_index_that_opens_furthest_reach
    assert_equal 3, jump([3, 4, 3, 2, 5, 4, 3])
  end

  def test_increasing_values
    assert_equal 2, jump([1, 2, 3])
  end

  def test_longer_array_minimum_jumps
    assert_equal 3, jump([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9])
  end
end
