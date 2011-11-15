// Elements wholesale copied from futon.js
// $$ inspired by @wycats: http://yehudakatz.com/2009/04/20/evented-programming-with-jquery/
function $$(node) {
  var data = $(node).data("$$");
  if (data) {
    return data;
  } else {
    data = {};
    $(node).data("$$", data);
    return data;
  }
};

function toJSON(obj) {
  return obj !== null ? JSON.stringify(obj, null, 2) : null;
};

(function($) {

  $.admin = $.admin || {};
  $.extend($.admin, {
    header: function() {
      $(".loggedin").hide();
      $(".loggedout").hide();
      $(".adminparty").hide();
      $.couch.session({
        success : function(r) {
          var userCtx = r.userCtx;
          $$("#userCtx").userCtx = userCtx;
          if (userCtx.name) {
            $(".usersname").text(userCtx.name);
            $(".loggedin").show();
          } else if (userCtx.roles.indexOf("_admin") != -1) {
            $(".adminparty").show();
          } else {
            $(".loggedout").show();
          };
        }
      })
    },
    ready: function() {
      $("form#request").submit(function() {
        var method = $("#method").val();
        var url = $("#url").val();
        var data = $("textarea").val();
        $.ajax({
          url: url,
          type: method,
          success: function(data) {
            $("code").html(toJSON(data));
            $("pre").removeClass("error");
          },
          error: function(xhr) {
            $("code").html(toJSON(JSON.parse(xhr.responseText)));
            $("pre").addClass("error");
          },
          dataType: "json",
          processData: false,
          data: data,
          contentType: "application/json"
        });
        return false; // so page doesnt refresh
      });

      $(".logout").click(function() {
        $.couch.logout({
          success: function(resp) {
            $.admin.header();
          }
        });
        return false;
      });

      $("form#login").submit( function () {
        var name = $("#username").val();
        var password = $("#password").val();

        $.couch.login({
          name : name,
          password : password,
          success : function() {
            $.admin.header();
          },
          error : function(code, error, reason) {
            $.admin.header();
          }
        });

        // clear form fields
        $("#username").val("");
        $("#password").val("");

        return false;
      });

      $("textarea").enableTabInsertion("  ");
    }
  });

  $.fn.enableTabInsertion = function(chars) {
    chars = chars || "\t";
    var width = chars.length;
    return this.keydown(function(evt) {
      if (evt.keyCode == 9) {
        var v = this.value;
        var start = this.selectionStart;
        var scrollTop = this.scrollTop;
        if (start !== undefined) {
          this.value = v.slice(0, start) + chars + v.slice(start);
          this.selectionStart = this.selectionEnd = start + width;
        } else {
          document.selection.createRange().text = chars;
          this.caretPos += width;
        }
        return false;
      }
    });
  }

  $(function() {
    $.admin.header();
    $.admin.ready();
  });

})(jQuery);
